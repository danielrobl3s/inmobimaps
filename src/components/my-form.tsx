"use client"
import {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Button
} from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import LocationSelector from "./ui/location-input"
import {
  Input
} from "./ui/input"
import {
  Textarea
} from "./ui/textarea"

const formSchema = z.object({
  name_9684465926: z.tuple([z.string(), z.string().optional()]),
  name_0656899817: z.string().min(1),
  name_2061850251: z.string().min(1),
  name_9067173528: z.string().min(1),
  name_9662235902: z.string().min(1).optional(),
  name_6762356511: z.string(),
  name_5099678897: z.string().min(1),
  name_4560854964: z.string()
});

export function MyForm() {

  const [countryName, setCountryName] = useState < string > ('Mexico')
  const [stateName, setStateName] = useState < string > ('Durango')

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
           <FormField
              control={form.control}
              name="name_9684465926"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecciona el estado de la república mexicana</FormLabel>
                  <FormControl>
                  <LocationSelector
                    onCountryChange={(country) => {
                      setCountryName(country?.name || '')
                      form.setValue(field.name, [country?.name || '', stateName || ''])
                    }}
                    onStateChange={(state) => {
                      setStateName(state?.name || '')
                      form.setValue(field.name, [form.getValues(field.name)[0] || '', state?.name || ''])
                    }}
                  />
                  </FormControl>
                  <FormDescription>Primero selecciona el estado de México en donde se ubica la propiedad que quieres registrar.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        
        <FormField
          control={form.control}
          name="name_0656899817"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input 
                placeholder="Calle 7, número 132, agrícola Pantitlán, Ciudad de México, Delegación Iztacalco 08100"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>Escribe la ubicación de la propiedad que quieres guardar</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name_2061850251"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del propietario</FormLabel>
              <FormControl>
                <Input 
                placeholder="Daniel Robles"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>Nombre de la persona dueña de la propiedad</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name_9067173528"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del registrante</FormLabel>
              <FormControl>
                <Input 
                placeholder="Daniel Robles"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>Registrante de la propiedad (si eres un corredor o asesor inmobiliario).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name_9662235902"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa</FormLabel>
              <FormControl>
                <Input 
                placeholder="Explosivos marca ACME"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>Si eres asesor inmobiliario por parte de una empresa, escribela aquí</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name_6762356511"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Superficie construida</FormLabel>
              <FormControl>
                <Input 
                placeholder="120"
                
                type="number"
                {...field} />
              </FormControl>
              <FormDescription>Superficie construida en metros cuadrados</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name_5099678897"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Superficie de terreno</FormLabel>
              <FormControl>
                <Input 
                placeholder="300 x 300"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>Superficie del terreno delimitado en metros cuadrados</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name_4560854964"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Características</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="3 recamaras, 2 baños y medio, cuarto de lavado, cochera para dos autos, patio con jardín y boiler solar"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Menciona características de la propiedad como cuantos baños tiene, recamaras, cocina, patio, lavadero, etc.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}