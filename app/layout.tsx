"use client";
import { PropsWithChildren, useEffect, useState } from 'react'
import type { Metadata } from "next";
import "./globals.css";
import ContextProvider from "./context-provider";
import Header from "@/components/Header/Header";
import ConfigurableValues from "../config/constants";
import GoogleMapsLoader from "@/components/GoogleMapsLoader/GoogleMapsLoader";
import { ConfigurationProvider } from "@/context/Configuration";
import { LocationProvider } from "@/context/Location";


export default function RootLayout({ children }: PropsWithChildren<{}>) {
  const { GOOGLE_MAPS_KEY, LIBRARIES } = ConfigurableValues();

  return (
    <html lang="en">
      <ContextProvider>
        <GoogleMapsLoader
          GOOGLE_MAPS_KEY={GOOGLE_MAPS_KEY}
          LIBRARIES={LIBRARIES}
        >
          <body>
            <Header />
            {children}
          </body>
        </GoogleMapsLoader>
      </ContextProvider>
    </html>
  );
}
