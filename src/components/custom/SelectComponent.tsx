import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const FormSchema = z.object({
  page_id: z.string({
    required_error: "Please select a notion page",
  }),
});

function SelectComponent({ fluxTitle, fluxDescription }) {
  const [notionPages, setNotionPages] = useState([]);
  const { user } = useAuth0();
  const email = user?.email;
  const access_token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchNotionPages = async () => {
      const response = await axios.post(
        "http://localhost:4000/api/fetchpages",
        { access_token: access_token },
      );
      console.log(response.data.data);
      setNotionPages(response.data.data);
    };
    fetchNotionPages();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    const pageCreationResponse = await axios.post(
      "http://localhost:4000/api/create/notionpage",
      {
        page_id: data.page_id,
        email: email,
        access_token: access_token,
        title: fluxTitle,
      },
    );

    console.log(pageCreationResponse.data);
    const createdPageId = pageCreationResponse.data.data;
    console.log(`Created page id: ${createdPageId}`);

    const appendContentResponse = await axios.post(
      "http://localhost:4000/api/appendcontent",
      {
        page_id: createdPageId,
        email: email,
        content: fluxDescription,
        access_token: access_token,
      },
    );
    console.log(appendContentResponse.data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="page_id"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the notion page " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {notionPages.map((page) => (
                    <SelectItem key={page.id} value={page.id}>
                      {page?.properties?.title?.title[0]?.plain_text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default SelectComponent;
