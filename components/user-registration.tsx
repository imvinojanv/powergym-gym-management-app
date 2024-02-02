"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Plus, ThermometerSnowflake } from "lucide-react";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Description is required",
    }),
    options: z.string().min(1),
    date: z.date(),
    time: z.string().min(1),
});

const UserRegistration = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            options: "",
            date: undefined,
            time: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Make the request to the server
            console.log("VALUES", values);

            // Check if it's the last step, then submit the form
            if (currentStep === 3) {        // at the end of the step
                // Perform submit logic here
                console.log("Form submitted");
                form.reset();
                setIsOpen(false);
            } else {
                // Move to the next step
                setCurrentStep((prevStep) => prevStep + 1);
            }
        } catch (error) {
            console.log("ERROR:", error);
        } finally {
            setCurrentStep(1);
        }
    }
    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <Button className="flex gap-2 pr-5" onClick={() => setIsOpen(true)}>
                    User Registration
                </Button>
            </DialogTrigger>
            <DialogContent className="max-md:py-8 md:p-8">
                <DialogHeader className="mt-2">
                    <div className="flex justify-between items-center">
                        <DialogTitle>User Registration</DialogTitle>
                        <div className="flex gap-2">
                            {[1, 2, 3].map((step) => (
                                <div
                                    key={step}
                                    className={`h-2 w-2 rounded-full mx-1 ${step <= currentStep ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                    <DialogDescription>
                        Add your details. Click continue when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-4 mt-4"
                    >
                        {currentStep === 1 && (
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">
                                                Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="Type your name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="options"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">
                                                Options
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the machine" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='a'>Option 1</SelectItem>
                                                    <SelectItem value='b'>Option 2</SelectItem>
                                                    <SelectItem value='c'>Option 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="flex flex-col gap-6">
                                <div className="w-full">
                                    <FormLabel className="text-base">
                                        Date & Time
                                    </FormLabel>
                                    <div className="mt-2 w-full flex gap-4">
                                        <div className="w-3/5">
                                            <FormField
                                                control={form.control}
                                                name="date"
                                                render={({ field }: { field: FieldValues['fields']['date'] }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                type="date"
                                                                disabled={isSubmitting}
                                                                placeholder="e.g. '-17°C'"
                                                                {...field}
                                                                value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                                                                onChange={(e) => {
                                                                    const selectedDate = new Date(e.target.value);
                                                                    form.setValue('date', selectedDate, { shouldValidate: true, shouldDirty: true });
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="w-2/5">
                                            <FormField
                                                control={form.control}
                                                name="time"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select time" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="morning">Morning</SelectItem>
                                                                <SelectItem value="noon">Noon</SelectItem>
                                                                <SelectItem value="Evening">Evening</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <div className="mt-4 mb-2 flex gap-4">
                                {currentStep === 1 && (
                                    <Button variant='secondary' className="flex gap-2 pr-5" onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </Button>
                                )}

                                {currentStep > 1 && (
                                    <Button
                                        variant="outline"
                                        className="flex gap-2 pr-5"
                                        onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
                                    >
                                        Back
                                    </Button>
                                )}

                                {currentStep < 3 && (
                                    <Button
                                        onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
                                        className="flex gap-2 pr-5"
                                    >
                                        Continue
                                    </Button>
                                )}

                                {currentStep === 3 && (
                                    <Button
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                        className="flex gap-2 pr-5"
                                    >
                                        <Check className={cn("w-5 h-5", isSubmitting && "hidden")} />
                                        <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSubmitting && "flex")} />
                                        Submit
                                    </Button>
                                )}
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default UserRegistration