"use client";
import { TArticle, TUpdateArticleDto } from "@/types/article";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import ControlledTextField from "../controlled/controlled-textfield";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../ui/separator";
import ManageCategoriesModal from "../modals/manage-categories-modal.component";
import { useGetCategoriesQuery } from "@/lib/react-query/queries/category.queries";
import ControlledInput from "../controlled/controller-input.component";
import { MultiSelect } from "../ui/multi-select";
import { cn, getMinCountMessage, getRequiredMessage } from "@/lib/utils";
import ImagePicker from "../ui/image-picker";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import ArticleEditor from "../article-editor/article-editor.component";
import {
  useGetArticleByIdQuery,
  useSaveArticleChangesMutation,
} from "@/lib/react-query/queries/articles.queries";
import { useToast } from "@/hooks/use-toast";
import LoadingOverlay from "../ui/loading-overlay";
import {
  deleteArticleById,
  publishArticleById,
  updateArticle,
  updateArticleCoverImage,
} from "@/server-actions/articles";
import { useGetMembersQuery } from "@/lib/react-query/queries/member.queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import {
  PlusIcon,
  SaveIcon,
  SquareArrowUpRightIcon,
  SquareCheckBig,
  TrashIcon,
} from "lucide-react";
import FormSection from "../pages-components/dashboard/shared/form-section.component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Fab from "../fab/fab.component";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

const handleMergeFormWithArticleData = ({
  formValues,
  article,
}: {
  formValues: TArticleForm;
  article: TArticle;
}): TUpdateArticleDto => ({
  ...article,
  slug: formValues.slug,
  title: formValues.title,
  content: formValues.content,
  metaKeywords: formValues.metaKeywords,
  categories: formValues.categories,
  participations: formValues.participations.map((p) => ({
    memberId: p.memberId,
    participationText: p.participationText,
  })),
});

const articleFormSchema = z.object({
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  contentShort: z.string(),
  // metaTitle: z
  //   .string()
  //   .min(1, { message: getRequiredMessage() })
  //   .max(60, { message: getMaxMessage(60) }),
  // metaDescription: z.string().max(155, { message: getMaxMessage(155) }),
  metaKeywords: z.string(),
  categories: z.array(z.number()).min(1, { message: getMinCountMessage(1) }),
  participations: z.array(
    z.object({
      memberId: z.number().min(1, {
        message: getRequiredMessage(),
      }),
      participationText: z.string().min(1, {
        message: getRequiredMessage(),
      }),
    }),
  ),
});

export type TArticleForm = typeof articleFormSchema._type;

const ArticleForm: React.FC<{ articleId: number }> = ({ articleId }) => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    data: article,
    refetch,
    isFetching: isFetchingArticle,
    isLoading: isLoadingArticle,
  } = useGetArticleByIdQuery(articleId);

  // const { mutateAsync: saveArticleChanges, isPending: isSavingArticleChanges } =
  //   useSaveArticleChangesMutation();

  const [openCategoriesModal, setOpenCategoriesModal] = useState(false);

  const [image, setImage] = useState<File | null>(null);

  const form = useForm<TArticleForm>({
    defaultValues: {
      slug: "",
      title: "",
      content: "",
      // metaTitle: "",
      // metaDescription: "",
      metaKeywords: "",
      categories: [],
      participations: [],
    },
    resolver: zodResolver(articleFormSchema),
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "participations", // unique name for your Field Array
  });

  const { data: categories } = useGetCategoriesQuery();
  const { data: members } = useGetMembersQuery();

  const handleSaveChanges = async () => {
    if (!article) return;

    try {
      await updateArticle(
        handleMergeFormWithArticleData({
          formValues: form.getValues(),
          article,
        }),
      );
      await refetch();
      toast({
        variant: "success",
        title: "تم حفظ التغيرات بنجاح",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "حصل خطأ ما",
        description: error?.message ?? "",
      });
    }
  };

  const handlePublish = async () => {
    if (!article) return;
    try {
      await publishArticleById(article.id);
      // await saveArticleChanges({
      //   articleData: handleMergeFormWithArticleData({
      //     article,
      //     categories,
      //     formValues: form.getValues(),
      //   }),
      //   image,
      //   action: UPDATE_ARTICLE_ACTION_TYPE.PUBLISH,
      // });
      toast({
        variant: "success",
        title: "تم نشر المقالة بنجاح",
      });
      router.back();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "حصل خطأ ما",
        description: error?.message ?? "",
      });
    }
  };

  const handleDelete = async () => {
    if (!article) return;
    // await axios.delete("/api/articles", {
    //   data: {
    //     id: article!.id,
    //   },
    // });
    await deleteArticleById(article.id);

    router.push("/dashboard/articles");
  };

  const handleUpdateImage = async () => {
    try {
      await updateArticleCoverImage({
        newCoverImage: image!,
        articleId: article!.id,
        oldCoverImageId: article?.coverImageId ?? undefined,
      });

      await refetch();

      setImage(null);

      toast({
        variant: "success",
        title: "تم حفظ التغيرات بنجاح",
      });
    } catch (error: any) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "حصل خطأ ما",
        description: error?.message ?? "",
      });
    }
  };

  useEffect(() => {
    if (article) {
      form.reset({
        slug: article.slug,
        title: article.title,
        content: article.content,
        contentShort: article.contentShort,
        // metaTitle: article.metaTitle,
        // metaDescription: article.metaDescription,
        metaKeywords: article.metaKeywords,
        categories: article.categories.map((c) => c.id),
        participations: article.participations.map((c) => ({
          memberId: c.member.id,
          participationText: c.participationText,
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  if (isLoadingArticle || isFetchingArticle || !article)
    return <LoadingOverlay message="جار تحميل المقالة" />;

  console.log(form.formState.dirtyFields);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlePublish)}>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="basics">الأساسيات</TabsTrigger>
            <TabsTrigger value="content">المحتوى</TabsTrigger>
            <TabsTrigger value="coverImage">صورة الغلاف</TabsTrigger>
            <TabsTrigger value="about">حول</TabsTrigger>
          </TabsList>
          <TabsContent value="basics">
            <FormSection label="الحقول الاساسية" className="gap-3">
              <ControlledTextField
                control={form.control}
                name="title"
                label="عنوان المقالة"
              />
              <div className="flex gap-1 items-end">
                <ControlledInput
                  control={form.control}
                  name="categories"
                  label="التصنيف"
                >
                  {({ field }) => (
                    <div className="w-full flex gap-2">
                      <MultiSelect
                        values={field.value as any}
                        onValueChange={field.onChange}
                        options={categories || []}
                        getOptionLabel={(option) => option?.name}
                        getOptionValue={(option) => option?.id as any}
                      />
                      <ManageCategoriesModal
                        open={openCategoriesModal}
                        setOpen={setOpenCategoriesModal}
                      />
                    </div>
                  )}
                </ControlledInput>
              </div>
              <ControlledTextField
                control={form.control}
                name="metaKeywords"
                label="الكمات المفاتحية [ خاص بمحرك البحث ]"
                helperText="يفضل ان يكون على الاقل 5 كلمات"
              />
            </FormSection>
          </TabsContent>
          <TabsContent value="content">
            <ControlledInput
              control={form.control}
              name="content"
              label="المحتوى"
            >
              {({ field }) => (
                <ArticleEditor value={field.value} onChange={field.onChange} />
              )}
            </ControlledInput>
          </TabsContent>
          <TabsContent value="coverImage">
            <FormSection
              label="صورة الغلاف"
              actionArea={
                image && (
                  <Button
                    size="sm"
                    variant="success"
                    onClick={handleUpdateImage}
                  >
                    حفظ
                  </Button>
                )
              }
            >
              <ImagePicker
                file={image}
                onChange={setImage}
                uploadedImageUrl={
                  article.cover ? `/uploads/${article.cover.fileName}` : ""
                }
              />
            </FormSection>
          </TabsContent>
          <TabsContent value="about">
            <div className="flex flex-col gap-4  relative">
              <FormSection
                label="المشاركين في الإعداد"
                actionArea={
                  <Button
                    type="button"
                    onClick={() => {
                      append({ memberId: 0, participationText: "" });
                    }}
                  >
                    إضافة
                    <PlusIcon />
                  </Button>
                }
              >
                {fields.map((ap, idx) => (
                  <div className="flex gap-1" key={ap.id}>
                    <ControlledInput
                      control={form.control}
                      name={`participations.${idx}.memberId`}
                      label="العضو"
                      className="w-[250px]"
                    >
                      {({ field }) => (
                        <Select
                          value={field.value.toString()}
                          onValueChange={(v) => field.onChange(Number(v))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {members?.map((m) => (
                              <SelectItem key={m.id} value={m.id.toString()}>
                                {m.displayName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </ControlledInput>
                    <ControlledInput
                      control={form.control}
                      name={`participations.${idx}.participationText`}
                      label="اسم الضو"
                    >
                      {({ field }) => (
                        <Input value={field.value} onChange={field.onChange} />
                      )}
                    </ControlledInput>
                  </div>
                ))}
              </FormSection>
              <div className="gap-4 w-full items-start grid grid-cols-4">
                <div className="flex flex-col gap-1 col-span-4 xl:col-span-1">
                  <FormSection label="تاريخ الإنشاء:">
                    <p>
                      {Intl.DateTimeFormat("ar-SY", {
                        dateStyle: "long",
                        timeStyle: "short",
                      }).format(new Date(article.createdAt))}
                    </p>
                  </FormSection>
                </div>
                <div className="flex flex-col gap-1 col-span-4 xl:col-span-1">
                  <FormSection label="تاريخ اخر تعديل:">
                    <p>
                      {Intl.DateTimeFormat("ar-SY", {
                        dateStyle: "long",
                        timeStyle: "short",
                      }).format(new Date(article.updatedAt))}
                    </p>
                  </FormSection>
                </div>
                <div className="flex flex-col gap-1 col-span-4 xl:col-span-1">
                  <FormSection label="تاريخ النشر:">
                    <p>
                      {article.publishedAt
                        ? Intl.DateTimeFormat("ar-SY", {
                            dateStyle: "long",
                            timeStyle: "short",
                          }).format(new Date(article.publishedAt))
                        : "لم يتمر النشر بعد"}
                    </p>
                  </FormSection>
                </div>
                <div className="flex flex-col gap-1 col-span-4 xl:col-span-1">
                  <FormSection label="المشاهدات">
                    <p>
                      {article.publishedAt
                        ? article.views
                        : "لم يتمر النشر بعد"}
                    </p>
                  </FormSection>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleSaveChanges}
                  disabled={!form.formState.isDirty}
                >
                  حفظ التعديلات
                </Button>
                <Button
                  disabled={form.formState.isDirty || !form.formState.isValid}
                  type="submit"
                  variant="success"
                  className="w-full"
                  onClick={handlePublish}
                >
                  نشر
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full"
                  onClick={handleDelete}
                >
                  حذف
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Fab
          buttons={[
            {
              id: 1,
              renderButton: ({ defaultClassname }) => (
                <DropdownMenu key={1}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className={cn(
                        defaultClassname,
                        "w-[unset] h-unset p-2 px-4",
                      )}
                      type="button"
                    >
                      اإجراءات
                      <SquareCheckBig />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="end">
                    <DropdownMenuItem
                      className="flex items-center justify-between"
                      disabled={!form.formState.isDirty}
                      onClick={handleSaveChanges}
                    >
                      حفظ
                      <SaveIcon className="text-success" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center justify-between"
                      disabled={
                        form.formState.isDirty || !form.formState.isValid
                      }
                      onClick={handlePublish}
                    >
                      نشر
                      <SquareArrowUpRightIcon className="text-primary" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center justify-between"
                      onClick={handleDelete}
                    >
                      حذف
                      <TrashIcon className="text-destructive" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ),
            },
          ]}
        />
      </form>
    </Form>
  );
};
export default ArticleForm;
