'use client'

import { ArrowLeft, Atom } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UploadDropzone } from '@/components/uploadthing'
import { useToast } from '@/components/ui/use-toast'
import NovelEditor from '@/components/novel-editor'

interface Props {
  params: {
    siteId: string
  }
}

const CreatePostPage = ({ params }: Props) => {
  const { siteId } = params

  const { toast } = useToast()
  const form = useForm()

  const onSubmit = async () => {}

  return (
    <>
      <div className="flex items-center">
        <Button asChild size="icon" variant="outline" className="mr-3">
          <Link href={`/dashboard/sites/${siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Craete Post</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Reprehenderit, beatae.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Next js blogging apps" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Post slug" {...field} />
                    </FormControl>
                    <Button variant="secondary" type="button">
                      <Atom className="mr-2 size-4" /> Generate Slug
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description for your blog post..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt="Uploaded Image"
                        className="h-[200px] w-[200px] rounded-lg object-cover"
                        width={200}
                        height={200}
                      />
                    ) : (
                      <FormControl>
                        <UploadDropzone
                          endpoint="imageUpload"
                          className="border-border"
                          onClientUploadComplete={(res) => {
                            field.onChange(res[0].url)
                            toast({
                              title: 'Image uploaded',
                              description: 'Your image has been uploaded',
                            })
                          }}
                          onUploadError={() => {
                            toast({
                              title: 'Upload failed',
                              description: 'Something went wrong...',
                              variant: 'destructive',
                            })
                          }}
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Content</FormLabel>
                    <FormControl>
                      <NovelEditor
                        initialValue={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-fit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default CreatePostPage
