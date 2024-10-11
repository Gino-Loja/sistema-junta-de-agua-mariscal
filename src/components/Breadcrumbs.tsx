import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon } from './icons/sidebar/home-icon';
import { AccountsIcon } from './icons/sidebar/accounts-icon';

export default function BreadcrumbsCustom() {

    const icons: Record<string, React.ReactNode> = {
        home: <HomeIcon />,
        users: <AccountsIcon />,

    }
    const pathname = usePathname(); // Obtiene la ruta actual
    const pathnames = pathname.split('/').filter((x) => x); // Divide y filtra la ruta

    return (
        <div className="flex flex-col flex-wrap gap-2">

            <Breadcrumbs variant="solid">
                <BreadcrumbItem href='/' startContent={<HomeIcon />}>

                    {/* <Link href={'/'} > */}
                        Inicio
                    {/* </Link> */}


                </BreadcrumbItem>
                {pathnames.map((pathname, index) => {
                    const isLast = index === pathnames.length - 1;
                    const href = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return isLast ? (
                        <BreadcrumbItem size='sm' href={href} startContent={icons[decodeURIComponent(pathname)]} >
                            {/* <Link href={href} className="text-gray-600"> */}
                                {decodeURIComponent(pathname)}
                            {/* </Link> */}
                        </BreadcrumbItem>
                    ) : (

                        <BreadcrumbItem  href={href} >
                            {/* <Link href={href} className="text-gray-600"> */}
                                {decodeURIComponent(pathname)}

                            {/* </Link> */}
                        </BreadcrumbItem>

                    );
                })}
            </Breadcrumbs>

        </div>



    );
}
