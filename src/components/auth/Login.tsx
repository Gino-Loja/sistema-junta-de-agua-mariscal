import { Button, Input, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

export const Login = () => {
    return <>
        <div className='flex flex-col w-1/2 gap-4 mb-4'>

            <Card>
                <CardHeader></CardHeader>
                <CardBody className="space-y-6 px-4">
                    <Input
                        variant='bordered'
                        label='Usuario'
                        type='text'
                    //   value={values.email}
                    //   isInvalid={!!errors.email && !!touched.email}
                    //   errorMessage={errors.email}
                    //   onChange={handleChange("email")}
                    />
                    <Input
                        variant='bordered'
                        label='Password'
                        type='password'
                    //   value={values.password}
                    //   isInvalid={!!errors.password && !!touched.password}
                    //   errorMessage={errors.password}
                    //   onChange={handleChange("password")}
                    />
                    <Button
                        className="w-2/3 mx-auto"
                        variant='flat'
                        color='primary'>
                        Ingresar
                    </Button>
                </CardBody>
                {/* <CardFooter>
                   
                </CardFooter> */}
            </Card>

        </div>
    </>


};