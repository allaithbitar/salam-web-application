import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SaveIcon, SettingsIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { z } from "zod";
import { Form } from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addCategory,
  deleteCategoryById,
  updateCategoryById,
} from "@/server-actions/categories";
import ControlledInput from "../controlled/controller-input.component";
import { Input } from "../ui/input";
import { useGetCategoriesQuery } from "@/lib/react-query/queries/category.queries";
import { Separator } from "../ui/separator";
import { useQueryClient } from "@tanstack/react-query";
import { TCategory } from "@/types/category";
import { getRequiredMessage } from "@/lib/utils";
import LoadingOverlay from "../ui/loading-overlay";

const addCategoryFormSchema = z.object({
  name: z.string().min(1, { message: getRequiredMessage() }),
});

type TAddCategoryForm = typeof addCategoryFormSchema._type;

const ManageCategoriesModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localCategories, setLocalCategories] = useState<TCategory[]>([]);
  const form = useForm<TAddCategoryForm>({
    defaultValues: { name: "" },
    resolver: zodResolver(addCategoryFormSchema),
    mode: "onChange",
  });
  const { data: categories } = useGetCategoriesQuery();
  const queryClient = useQueryClient();

  const handleCategoryChange = (newValue: string, index: number) => {
    const _localCategories = structuredClone(localCategories);

    _localCategories[index].name = newValue;

    setLocalCategories(_localCategories);
  };

  const handleAddCategory: SubmitHandler<TAddCategoryForm> = async ({
    name,
  }) => {
    try {
      setIsLoading(true);
      await addCategory({ name });

      await queryClient.invalidateQueries({
        queryKey: ["GET_CATEGORIES"],
        refetchType: "all",
      });

      console.log("success");
      form.reset();
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteCategroy = async (categoryId: number) => {
    try {
      setIsLoading(true);
      await deleteCategoryById(categoryId);
      await queryClient.invalidateQueries({
        queryKey: ["GET_CATEGORIES"],
        refetchType: "all",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCategory = async (category: TCategory) => {
    try {
      setIsLoading(true);
      await updateCategoryById(category);
      await queryClient.invalidateQueries({
        queryKey: ["GET_CATEGORIES"],
        refetchType: "all",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (categories) {
      setLocalCategories(categories);
      setIsLoading(false);
    }
  }, [categories]);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button size="icon" type="button" className="flex-shrink-0">
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">إدارة التصنيفات</DialogTitle>
          <DialogDescription>تعديل, إضافة, مسح تصنيف</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-2 relative">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.stopPropagation();
                form.handleSubmit(handleAddCategory)(e);
              }}
            >
              <ControlledInput
                label="إضافة صنف جديد"
                control={form.control}
                name="name"
              >
                {({ field }) => (
                  <div className="w-full flex gap-2 items-center">
                    <Input {...field} placeholder="إسم الصنف" />
                    <Button
                      size="sm"
                      type="submit"
                      className="flex-shrink-0"
                      disabled={
                        !!Object.values(form.formState.errors ?? {}).length
                      }
                    >
                      إضافة
                    </Button>
                  </div>
                )}
              </ControlledInput>
            </form>
          </Form>

          <div className="flex flex-col gap-2">
            <h6 className="font-bold text-xl">التصنيفات</h6>
            {localCategories.map((c, index) => {
              return (
                <div key={c.id} className="flex gap-2 items-center">
                  <Input
                    value={c.name}
                    onChange={(e) =>
                      handleCategoryChange(e.target.value, index)
                    }
                  />
                  <div className="flex gap-1 items-center">
                    <Button
                      type="button"
                      size="smallIcon"
                      variant="destructive"
                      onClick={() => handleDeleteCategroy(c.id)}
                    >
                      <TrashIcon />
                    </Button>
                    <Button
                      type="button"
                      disabled={
                        categories?.[index]?.name === c.name ||
                        c.name.length < 1
                      }
                      size="smallIcon"
                      onClick={() => handleUpdateCategory(c)}
                    >
                      <SaveIcon />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {isLoading && <LoadingOverlay />}
      </DialogContent>
    </Dialog>
  );
};

export default ManageCategoriesModal;
