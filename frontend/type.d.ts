import { Type as T, Static } from '@sinclair/typebox'

enum ProfileBadge {
    premium = 'premium'
}

enum ProfileVersion {
    v1 = 'v1'
}

enum ProfilePremiumType {
    donation = 'donation',
    launchPromo = 'launchPromo'
}

enum ProfileSocialType {
    discord = 'discord',
    telegram = 'telegram',
    instagram = 'instagram',
    twitter = 'twitter',
    youtube = 'youtube',
    twitch = 'twitch',
    activision = 'activision',
    playstation = 'playstation',
    battlenet = 'battlenet',
    steam = 'steam',
    hornet = 'hornet',
}

const ProfileSocial = T.Object({
    type: T.Enum(ProfileSocialType),
    value: T.String()
})

const ProfilePremiumSchema = T.Object({
    type: T.Enum(ProfilePremiumType),
    meta: T.Optional(T.String({ maxLength: 1024 })),
    updatedAt: T.Date()
});

const ProfileSchema = T.Object({
    version: T.Enum(ProfileVersion),

    slug: T.String(),
    username: T.Optional(T.String()),

    social: T.Array(ProfileSocial, { uniqueItems: true }),
    premium: ProfilePremiumSchema,

    createdAt: T.Optional(T.Date()),
    updatedAt: T.Optional(T.Date())
})