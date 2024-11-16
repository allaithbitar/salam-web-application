import { Button } from "@/components/ui/button";
import ImagePicker from "@/components/ui/image-picker";
import React, { useState } from "react";
import FormSection from "../shared/form-section.component";

const MemberProfileImage = ({
  onSave,
  memberImageUrl,
}: {
  onSave: (image: File) => void;
  memberImageUrl: string;
}) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <FormSection
      label="الصورة الشخصية"
      actionArea={
        file && (
          <Button size="sm" variant="success" onClick={() => onSave(file)}>
            حفظ
          </Button>
        )
      }
    >
      <ImagePicker
        file={file}
        onChange={setFile}
        uploadedImageUrl={memberImageUrl ? `/uploads/${memberImageUrl}` : ""}
        className="aspect-square"
      />
    </FormSection>
  );
};

export default MemberProfileImage;
