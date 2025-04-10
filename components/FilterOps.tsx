"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"

const frameworks = [
  
    {
      value: "ashanti",
      label: "Ashanti Region",
    },
    {
      value: "greater-accra",
      label: "Greater Accra Region",
    },
    {
      value: "central",
      label: "Central Region",
    },
    {
      value: "eastern",
      label: "Eastern Region",
    },
    {
      value: "western",
      label: "Western Region",
    },
    {
      value: "western-north",
      label: "Western North Region",
    },
    {
      value: "volta",
      label: "Volta Region",
    },
    {
      value: "oti",
      label: "Oti Region",
    },
    {
      value: "northern",
      label: "Northern Region",
    },
    {
      value: "savannah",
      label: "Savannah Region",
    },
    {
      value: "north-east",
      label: "North East Region",
    },
    {
      value: "upper-east",
      label: "Upper East Region",
    },
    {
      value: "upper-west",
      label: "Upper West Region",
    },
    {
      value: "bono",
      label: "Bono Region",
    },
    {
      value: "ahafo",
      label: "Ahafo Region",
    },
    {
      value: "bono-east",
      label: "Bono East Region",
    }
  ]
type Props = {
    name:string
}

export function FilterOps(props:Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[110px] justify-center"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : `${props.name}`}
          <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  //@ts-ignore
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
