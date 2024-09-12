'use client'

import { Atom } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import slugify from 'react-slugify'
import { zodResolver } from '@hookform/resolvers/zod'

import { createPostAction, updatePostAction } from '@/actions/posts'
import SubmitButton from '@/components/submit-button'
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
import { Post, postSchema } from '@/schemas/post'

interface Props {
  siteId: string
  post?: Post & {
    id: string
  }
}

const PostForm = ({ siteId, post }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { toast } = useToast()
  const form = useForm<Post>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      description: post?.description || '',
      content: post?.content || '',
      imageUrl: post?.imageUrl || '',
    },
  })
  const { watch, setValue } = form
  const title = watch('title')

  const generateSlug = () => {
    if (!title) {
      toast({
        title: 'Slug not generated',
        description: 'Please enter a title for your post',
        variant: 'destructive',
      })

      return
    }

    const slug = slugify(title)
    setValue('slug', slug)

    toast({
      title: 'Slug generated',
      description: 'Your slug has been generated',
    })
  }

  const onSubmit = async (data: Post) => {
    startTransition(() => {
      if (post) {
        updatePostAction(siteId, post.id, data)
      } else {
        createPostAction(siteId, data)
      }
    })
  }

  return (
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
              name="title"
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
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Post slug" {...field} />
                  </FormControl>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={generateSlug}
                  >
                    <Atom className="mr-2 size-4" /> Generate Slug
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
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
              name="imageUrl"
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Content</FormLabel>
                  <FormControl>
                    <NovelEditor
                      initialValue={
                        field.value ? JSON.parse(field.value) : undefined
                      }
                      onChange={(value) =>
                        field.onChange(JSON.stringify(value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton isLoading={isLoading} />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PostForm
