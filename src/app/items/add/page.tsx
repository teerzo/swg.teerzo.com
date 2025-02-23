
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import ItemsForm from '@/components/forms/ItemsForm';

export default function ItemsAdd() {

    return (
        <div className="flex flex-1 flex-col w-full p-5">
            <div className="flex flex-1 flex-row shadow rounded p-2 justify-center">
               <ItemsForm id={null}/>
            </div>
        </div>
    )
}


