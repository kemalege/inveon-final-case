import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from "@/components/ui/form";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";

const profileSchema = z.object({
    userName: z.string().min(3, "Username must be at least 3 characters."),
    email: z.string().email("Please enter a valid email."),
    city: z.string().optional(),
    phoneNumber: z.string().optional(),
});

type UserProfileData = z.infer<typeof profileSchema>;

const EditProfile = () => {
    const axiosPrivate = useAxiosPrivate();
    const { getDecodedToken } = useAuth();
    const token = getDecodedToken();
    const userId = token?.sub;
    
    const form = useForm<UserProfileData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            userName: "",
            email: "",
            city: "",
            phoneNumber: ""
        }
    });

    const { control, handleSubmit, formState: { errors }, setValue } = form;

    const { isLoading } = useQuery({
        queryKey: ["userProfile", userId],
        queryFn: async () => {
            const response = await axiosPrivate.get(`/users/${userId}`);
            const userData = response.data;
            setValue("userName", userData.userName);
            setValue("email", userData.email);
            setValue("city", userData.city);
            setValue("phoneNumber", userData.phoneNumber);
            return userData;
        },
        enabled: !!userId
    });

    const mutation = useMutation({
        mutationFn: async (data: UserProfileData) => {
            await axiosPrivate.put(`/users/${userId}`, data);
        },
        onSuccess: () => {
            toast({
                title: "Profile Updated",
                description: "Your profile information has been successfully updated.",
            });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: error.response?.data?.detail || "An error occurred while updating the profile."
            });
        }
    });

    const onSubmit = (data: UserProfileData) => {
        mutation.mutate(data);
    };

    return (
        <div className="max-w-lg mx-auto p-8 space-y-6">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your username" {...field} />
                                </FormControl>
                                <FormMessage>{errors.userName?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage>{errors.email?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your city" {...field} />
                                </FormControl>
                                <FormMessage>{errors.city?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="Enter your phone number" {...field} />
                                </FormControl>
                                <FormMessage>{errors.phoneNumber?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={mutation.isPending || isLoading}>
                        {mutation.isPending ? "Updating..." : "Update Profile"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default EditProfile;
