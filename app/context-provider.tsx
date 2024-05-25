'use client'
import { ContextProviders } from '../context/ContextProviders'

// @ts-ignore: Unreachable code error
export default function ContextProvider({ children }) {
  return (
    // @ts-ignore: Unreachable code error
    <ContextProviders>{children}</ContextProviders>
  )
}
