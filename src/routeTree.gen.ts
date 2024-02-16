/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicImport } from './routes/_public'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthIndexImport } from './routes/_auth/index'
import { Route as PublicLoginImport } from './routes/_public/login'
import { Route as AuthProfileImport } from './routes/_auth/profile'

// Create/Update Routes

const PublicRoute = PublicImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  path: '/',
  getParentRoute: () => AuthRoute,
} as any)

const PublicLoginRoute = PublicLoginImport.update({
  path: '/login',
  getParentRoute: () => PublicRoute,
} as any)

const AuthProfileRoute = AuthProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      preLoaderRoute: typeof PublicImport
      parentRoute: typeof rootRoute
    }
    '/_auth/profile': {
      preLoaderRoute: typeof AuthProfileImport
      parentRoute: typeof AuthImport
    }
    '/_public/login': {
      preLoaderRoute: typeof PublicLoginImport
      parentRoute: typeof PublicImport
    }
    '/_auth/': {
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthRoute.addChildren([AuthProfileRoute, AuthIndexRoute]),
  PublicRoute.addChildren([PublicLoginRoute]),
])

/* prettier-ignore-end */
