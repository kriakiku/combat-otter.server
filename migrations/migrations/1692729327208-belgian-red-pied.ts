import nano from 'nano'

export const name = "1692729327208-belgian-red-pied"
export const createdAt = 1692729327208
export const description = 'Create users table with index by username'

export async function exec({ db }: nano.ServerScope) {
    // Create
    await db.create('users')

    // Indexes
    const users = db.use('users')

    await users.createIndex({
        name: 'username_index',
        index: {
            fields: ['username']
        }
    })
}
