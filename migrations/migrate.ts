#!/usr/bin/env ts-node-script
import * as nano from 'nano'
import { Agent } from 'node:http'
import * as rawMigrations from './migrations'
import { performance } from 'node:perf_hooks'

const RETRY_TIMEOUT = 5000
const RETRY_LIMIT = 5

const agent = new Agent({
  keepAlive: true,
  maxSockets: 25
})

const db = nano({
    url: process.env.COUCHDB_SERVER,
    requestDefaults: {
        agent,
        auth: {
            username: process.env.COUCHDB_USER,
            password: process.env.COUCHDB_PASSWORD,
        }
    }
})

/**
 * TODO SAFE REPLICATION
 */
async function exec(nanoDb: nano.ServerScope, retryId = 0) {
    const { db, info } = nanoDb

    try {
        const { features } = await info()

        if (!features.includes('access-ready')) {
            throw new Error('Server not ready')
        }

    } catch (reason) {
        console.warn(`[migrate] Failed to connect to server: ${reason.message}. Try to reconnect (#${retryId})`)

        if (retryId <= RETRY_LIMIT) {
            await new Promise(resolve => setTimeout(resolve, RETRY_TIMEOUT))
            await exec(nanoDb, ++retryId)
        } else {
            throw Error('Exceeded the limit of attempts')
        }

        return
    }


    const existsTables = await db.list()
    const migrationsTable = db.use('migrations')
    const allMigrations = Object.values(rawMigrations) as unknown as IMigration[]

    // Base migration DB
    if (!existsTables.includes('migrations')) {
        await db.create('migrations')
        console.log('[migrate] Created migrations table')
    }

    // Already performed migrations
    const performedMigrations = (await migrationsTable.fetch({
        keys: allMigrations.map(value => value.name)
    }))
        .rows
        .filter(item => ('error' in item && !item.error) || ('doc' in item && item.doc))
        .map(item => item.key)

    // New migrations
    const newMigrations = allMigrations
        .filter(({ name }) => !performedMigrations.includes(name))
        .sort((left, right) => left.createdAt - right.createdAt)

    // Nothing
    if (newMigrations.length === 0) {
        console.log(`[migrate] Nothing to migrate`)
    }

    // Exec
    for (const migration of newMigrations) {
        console.log(`[migrate:${migration.name}] ${migration.description}`)
        const startedAt = performance.now()

        await migration.exec(nanoDb)

        const meta: IMigrationResult = {
            _id: migration.name,
            createdAt: new Date(migration.createdAt).toISOString(),
            executedAt: new Date().toISOString(),
            duration: `${Math.round((startedAt - performance.now()) * 100) / 100}ms`,
            description: migration.description
        }

        await migrationsTable.insert(meta)
    }
}

interface IMigrationResult extends nano.MaybeDocument {
    _id: string
    createdAt: string,
    executedAt: string,
    duration: string,
    description: string
  }

interface IMigration {
    name: string,
    createdAt: number,
    description: string,
    exec: (db: nano.ServerScope) => Promise<void>
}

exec(db)
    .then(() => console.log('[migrate] Done'))
    .catch(reason => console.warn(`[migrate] Fail to execute: ${reason.message}`));
