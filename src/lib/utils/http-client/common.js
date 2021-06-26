import Request from '@lib/Request'

export const req = new Request(`${process.env.REACT_APP_API_URL}/`)

export const { Get, Post, Patch, Delete, Put, reHydrateToken, reHydrateTenant } = req
