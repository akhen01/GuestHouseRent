import React from 'react'
import {Controller} from "react-hook-form"
import {Editor} from "@tinymce/tinymce-react"

function RTE({
    name, label, control, defaultValue=""
}) {
  return (
    <div className='w-full'>
        { label && (
            <label htmlFor="">
                {label}
            </label>
        )}
      <Controller
      name={name || "content"}
      control={control}
      render={({field : {onChange}}) => (
        <Editor 
        apiKey='6wz91ik17jlriw5uqobeo64xmst0jik3nvn0wgi03i6c9f1f'
        initialValue={defaultValue}
        init={{
            branding: false,
            height: 500,
            menubar: true,
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        }}
        onEditorChange={onChange}
        />
      )} 
      />
    </div>
  )
}

export default RTE
