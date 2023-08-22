#!/usr/bin/env ts-node-script
import { faker } from '@faker-js/faker'
import slugify from 'slugify'
import { writeFileSync, appendFileSync } from 'node:fs'

const type = faker.animal.type() as 'rabbit'
const createdAt = Date.now();
const slug = slugify(faker.animal[type](), {
    replacement: '-',
    lower: true,
    strict: true
})
const name = `${createdAt}-${slug}`

writeFileSync(
    `./migrations/${name}.ts`,
`import nano from 'nano'

export const name = ${JSON.stringify(name)}
export const createdAt = ${JSON.stringify(createdAt)}
export const description = ''

export async function exec({ db }: nano.ServerScope) {

}
`
)

appendFileSync(
    './migrations/index.ts',
    `export * as ${slug.replaceAll('-', '_')}_migration from './${name}'\n`
)

console.log(`Migration "./migrations/${name}.ts" created`)