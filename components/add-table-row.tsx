import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {useTableContext} from "@/context/table-context";
import {ErrorMessage, Formik} from "formik";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {translate} from "@/components/helpers/translations";
import {LoadingButton} from "@/components/loading-button";
import * as Yup from 'yup';

export const AddTableRow = () => {
  const {dataToRender, cellsType, filters, setInitialDataState} = useTableContext()

  const keys = Object.keys(cellsType)

  const validationSchema = Yup.object(
    keys.reduce((acc, key) => {
      acc[key] = Yup.string().required(translate("isRequired"));
      return acc;
    }, {} as Record<string, Yup.StringSchema>)
  );
  const handleSubmit = async (values: any) => {
    const lastID = dataToRender[dataToRender.length - 1]?.id ?? null

    if (lastID && lastID !== values.id) {
      values.id = Number(lastID) + 1

      setInitialDataState((prev) => [
        ...prev,
        values
      ])
    }
  }

  const initialValues = keys.reduce((acc, key) => {
    acc[key] = ""
    return acc
  }, {} as Record<string, string>)


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add new</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new table data!</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          onSubmit={values => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => {
            return (
              (
                <form onSubmit={handleSubmit}>
                  <div className={"grid grid-cols-2 gap-x-8 gap-y-2"}>
                    {keys.filter((key) => !filters.columnsToHide.includes(key)).map((key) => {
                      return (
                        <div key={key}>
                          <Label>{translate(key)}</Label>
                          <Input
                            type={cellsType[key]}
                            name={key}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.[key]}
                            placeholder={translate("insertValue")}
                            className={"mt-2"}
                          />
                          <ErrorMessage name={key} component={"div"} className={"text-red-500 text-sm ml-2 mt-2"}/>
                        </div>
                      )
                    })}
                  </div>
                  <LoadingButton
                    name={translate("add")}
                    isPending={isSubmitting}
                    className={"mt-12"}
                  />
                </form>
              )
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}