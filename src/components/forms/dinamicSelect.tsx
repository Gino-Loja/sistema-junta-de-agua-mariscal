"use client"

import React from "react"
import {
  Select,
  SelectItem,
  Avatar,
  Chip,
  Spinner
} from "@nextui-org/react"
import { Search } from "lucide-react"
import debounce from "lodash.debounce"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface UserSelectProps {

    defaultValue?: string
  label?: string
  placeholder?: string
  isRequired?: boolean
  errorMessage?: string
}

export function UserSelect({
  defaultValue,
  label = "Select User",
  placeholder = "Search user...",
  isRequired = false,
  errorMessage,
}: UserSelectProps) {
  const [users, setUsers] = React.useState<User[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<string | undefined>(defaultValue)

  // Simulated API call - replace with your actual API endpoint
  const searchUsers = async (query: string) => {
    setIsLoading(true)
    try {
      // Replace this with your actual API call
      // Example: const response = await fetch(`/api/users/search?q=${query}`)
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
      
      // Mock data - replace with actual API response
      const mockUsers: User[] = [
        { id: "1", name: "John Doe", email: "john@example.com", avatar: "https://i.pravatar.cc/150?u=1" },
        { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "https://i.pravatar.cc/150?u=2" },
        { id: "3", name: "Bob Johnson", email: "bob@example.com", avatar: "https://i.pravatar.cc/150?u=3" },
      ].filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      )

      setUsers(mockUsers)
    } catch (error) {
      console.error("Error searching users:", error)
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedSearch = React.useMemo(
    () => debounce((query: string) => searchUsers(query), 300),
    []
  )

  const handleSelectionChange = (userId: string) => {
    setSelectedUser(userId)
  }

  return (
    <Select
      items={users}
      label={label}
      placeholder={placeholder}
      labelPlacement="outside"
      isLoading={isLoading}
      selectedKeys={selectedUser ? [selectedUser] : []}
      onSelectionChange={(keys) => handleSelectionChange(Array.from(keys)[0] as string)}
      onOpenChange={(isOpen) => {
        if (isOpen) searchUsers("")
      }}
     
      onChange={(value) => console.log(value)}
      isRequired={isRequired}
      errorMessage={errorMessage}
      className="max-w-xs"
      scrollShadowProps={{
        isEnabled: true
      }}
      listboxProps={{
        itemClasses: {
          base: "px-3 rounded-md h-16 data-[hover=true]:bg-default-100",
        },
      }}
      startContent={
        <Search className="text-default-400" size={20} />
      }
      spinnerProps={{
        color: "primary",
      }}
      renderValue={(items) => {
        const item = items[0]
        if (!item) return null
        
        return (
          <div className="flex gap-2 items-center">
            <Avatar
              alt={item.data?.name}
              className="flex-shrink-0"
              size="sm"
              src={item.data?.avatar}
            />
            <div className="flex flex-col">
              <span className="text-small">{item.data?.name}</span>
              <span className="text-tiny text-default-400">{item.data?.email}</span>
            </div>
          </div>
        )
      }}
    >
      {(user) => (
        <SelectItem
          key={user.id}
          textValue={user.name}
        >
          <div className="flex gap-2 items-center">
            <Avatar
              alt={user.name}
              className="flex-shrink-0"
              size="sm"
              src={user.avatar}
            />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
              <span className="text-tiny text-default-400">{user.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  )
}