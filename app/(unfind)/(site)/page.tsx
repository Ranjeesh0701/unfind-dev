"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/libs/utils";
import { ArrowRight, Mic, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsStarFill } from "react-icons/bs";

export default function Home() {
  return (
    <div>
      <div className="px-4 py-4">
        <div className="bg-gray-200 min-h-screen rounded-lg flex flex-col">
          {/* Navbar */}
          <div className="relative flex items-center justify-between px-8 py-4">
            <Link href="/" className="text-2xl">
              Unfind
            </Link>
            <div className="hidden lg:block absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/freelancers" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Find freelancers
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/feed" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Find jobs
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      Getting started
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components that you can
                                copy and paste into your apps. Accessible.
                                Customizable. Open Source.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/docs" title="Introduction">
                          Re-usable components built using Radix UI and Tailwind
                          CSS.
                        </ListItem>
                        <ListItem
                          href="/docs/installation"
                          title="Installation"
                        >
                          How to install dependencies and structure your app.
                        </ListItem>
                        <ListItem
                          href="/docs/primitives/typography"
                          title="Typography"
                        >
                          Styles for headings, paragraphs, lists...etc
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/solutions" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Solutions
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full px-6" asChild>
                <Link href="/users/sign-in">Log in</Link>
              </Button>
              <Button className="rounded-full px-6" asChild>
                <Link href="/users/sign-up">Join us</Link>
              </Button>
            </div>
          </div>
          {/* Home page */}
          <div className="flex-1 flex gap-10 px-8 h-full">
            <div className="flex-1 my-auto py-10">
              <h1 className="text-6xl leading-tight">
                Elite <span className="font-bold">Freelance</span> Solutions for
                You.
              </h1>
              <div className="bg-white flex items-center px-1 py-1.5 mt-4 mb-6 rounded-full">
                <div className="px-4">
                  <Search className="w-5 h-5" />
                </div>
                <Input
                  placeholder="Search for any services..."
                  className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <div className="px-4">
                  <Mic className="w-5 h-5" />
                </div>
                <div className="bg-gray-900 p-3 rounded-full cursor-pointer">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-bold whitespace-nowrap">Popular skills:</p>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 text-sm backdrop-blur-md bg-white/40 rounded-full">
                    Web design
                  </div>
                  <div className="px-3 py-1 text-sm backdrop-blur-md bg-white/40 rounded-full">
                    Ui/Ux design
                  </div>
                  <div className="px-3 py-1 text-sm backdrop-blur-md bg-white/40 rounded-full">
                    Databases
                  </div>
                  <div className="px-3 py-1 text-sm backdrop-blur-md bg-white/40 rounded-full">
                    Content writing
                  </div>
                </div>
              </div>
              <div className="py-6">
                <p className="leading-7">
                  A freelance service web portal connects businesses with
                  freelancers, facilitating project collaborations and hiring.
                </p>
              </div>
              <div className="bg-white w-fit px-4 py-4 rounded-lg">
                <div className="flex items-center gap-10">
                  <div className="font-bold flex-1">Trusted Freelancers</div>
                  <div className="flex gap-2">
                    <BsStarFill className="text-orange-400" />
                    <BsStarFill className="text-orange-400" />
                    <BsStarFill className="text-orange-400" />
                    <BsStarFill className="text-orange-400" />
                    <BsStarFill className="text-orange-400" />
                  </div>
                </div>
                <div className="pt-4 flex">
                  <div className="flex flex-1 relative">
                    <div className="rounded-full w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-600"></div>
                    <div className="absolute left-6 rounded-full w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-600"></div>
                    <div className="absolute left-12 rounded-full w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-600"></div>
                    <div className="absolute left-[4.5rem] rounded-full w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-600"></div>
                    <div className="absolute left-[6rem] rounded-full w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-600"></div>
                  </div>
                  <div>
                    <p className="font-bold">200+</p>
                    <p className="text-xs">Satisfied Customers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-auto hidden lg:block my-auto">
              <div className="max-w-lg mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
