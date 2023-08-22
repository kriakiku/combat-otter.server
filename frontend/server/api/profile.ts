import { validateQuery, Type as T } from 'h3-typebox';

enum Type {
    slug = "slug",
    username = "username"
}

const schema = T.Object({
    type: T.Enum(Type),
    value: T.String()
})

export default defineEventHandler((event) => {
    validateQuery(event, schema);

    return {
      hello: 'world'
    }
})