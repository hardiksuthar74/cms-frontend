import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formMetadata } from "@/form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { z } from "zod";

const capitalizeFirstLetter = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export function DatePickerDemo() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

const FormBuilder = () => {
  const zof_form_generator = () => {
    const form_schema = z.object({});
  };

  const form = useForm();
  const inputGenerator = () => {
    const { properties } = formMetadata;

    return Object.keys(properties).map((form_field) => {
      switch (properties?.[form_field]?.type) {
        case "select":
          return (
            <FormField
              control={form.control}
              name={form_field}
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel>
                      {capitalizeFirstLetter(form_field).replace("_", " ")}
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder={`Enter ${form_field}`} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        case "date":
          return (
            <FormField
              control={form.control}
              name={form_field}
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel>
                      {capitalizeFirstLetter(form_field).replace("_", " ")}
                    </FormLabel>
                    <FormControl>
                      <DatePickerDemo />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        default:
          return (
            <FormField
              control={form.control}
              name={form_field}
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel>
                      {capitalizeFirstLetter(form_field).replace("_", " ")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        {...field}
                        type={properties?.[form_field]?.format ?? "text"}
                        placeholder={`Enter ${form_field}`}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
      }
    });
  };

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="flex flex-col gap-y-4 p-4">
      <p>{formMetadata.title.replace(/([a-z])([A-Z])/g, "$1 $2")}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {inputGenerator()}
            <Button type="submit" className="w-full col-span-2">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormBuilder;
