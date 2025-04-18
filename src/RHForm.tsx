import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ZodSchema } from "zod";

//실행 시점에 타입을 정하는게 좋습니다!

type RHFormProps<T> = {
  //2) 몰라 여기서 받아오셈, 근데 이건 어디서 받아옴?
  schema: ZodSchema<T>; // 1) T가 뭔데?
  defaultValues?: DefaultValues<T>;
  showDevTools?: boolean
  onSubmit: SubmitHandler<T>;
    onError?: (errors: any) => void;
    validateOnload?: boolean;
    mode?: 'all' | 'onBlur' | 'onChange' | 'onSubmit'
};
// 3) 몰라 props로 넘길때 타입 알아서 맞춰서 주겠지, 다 돌려서 쓰셈
function RHForm<T extends FieldValues>({
  children,
  schema,
  defaultValues,
  showDevTools = import.meta.env.MODE === 'development',
  onSubmit,
  onError,
  validateOnload = false,
  mode = 'all'
}: PropsWithChildren<RHFormProps<T>>) {
  const methods = useForm<T>({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
    mode
  });
  
  useEffect(() => {
  	if(validateOnload){
    	methods.trigger()
    }
  },[methods, methods.trigger, validateOnload])
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>{children}</form>
      {showDevTools && <DevTool control={methods.control} />}
    </FormProvider>
  );
}

export default RHForm;