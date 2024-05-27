"use client";
import { PropsWithChildren, useEffect, useState } from 'react'
import type { Metadata } from "next";
import "./globals.css";
import ContextProvider from "./context-provider";
import Header from "@/components/Header/Header";
import ConfigurableValues from "../config/constants";
import GoogleMapsLoader from "@/components/GoogleMapsLoader/GoogleMapsLoader";
import Footer from '@/components/Footer/Footer';


export default function RootLayout({ children }: PropsWithChildren<{}>) {
  const { GOOGLE_MAPS_KEY, LIBRARIES } = ConfigurableValues();

  return (
    <html lang="en">
      <head>
        <title>Enatega-Food Delivery</title>
        <meta name='description' content='Enatega-Food Delivery' />
        <link rel='icon' href='/logo.svg' />
        </head>
      <ContextProvider>
        <GoogleMapsLoader
          GOOGLE_MAPS_KEY={GOOGLE_MAPS_KEY}
          LIBRARIES={LIBRARIES}
        >
          <body>
            <Header />
            {children}
            <Footer/>
          </body>
        </GoogleMapsLoader>
      </ContextProvider>
    </html>
  );
}
