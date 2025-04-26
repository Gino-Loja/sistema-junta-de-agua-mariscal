
'use client'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { type User } from "@supabase/supabase-js";


export const UserDropdown = () => {

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)

  }
  const supabase = createClient()
  const router = useRouter()

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()


  // if (user) {
  //   await supabase.auth.signOut()
  // }



  return (
    <Dropdown >
      <NavbarItem>
        <DropdownTrigger>

          <Avatar as="button"
            name={user?.email} size="sm" isBordered color="primary" />

        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
      variant={'faded'}
        aria-label="User menu actions"
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>{user?.email}</p>
        </DropdownItem>
        <DropdownItem
          key="nombres"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>{user?.user_metadata?.nombres}</p>
        </DropdownItem>
        <DropdownItem
          key="rol"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>{user?.user_metadata?.rol}</p>
        </DropdownItem>
      
        <DropdownItem
          key="rol"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>{user?.user_metadata?.celular}</p>
        </DropdownItem>

      


        {/* <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem> */}
        {/* <DropdownItem key="Configuracion" onPress={() => }>Configuracion</DropdownItem> */}
        {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
        <DropdownItem key="logout" onPress={
          async () => {
            await supabase.auth.signOut()
            router.push("/login")
            // await router.push("/auth/login")
          }
        } color="danger" variant={ 'flat'}className="text-danger ">
          Salir
        </DropdownItem>
        <DropdownItem key="switch">
          <div className="flex flex-row items-center justify-between w-full">
          Modo Oscuro
          <DarkModeSwitch />
          </div>
         
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
