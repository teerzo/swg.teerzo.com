
'use client';



import ItemsTable from "@/components/tables/ItemsTable";

export default function Items() {


    return (
        <div className="flex flex-1 flex-col w-full p-5">
            <div className="flex flex-1 flex-row shadow rounded p-2">
                <ItemsTable />

                {/* <div className="w-30 p-2">
                    <TableFilters />
                </div>
                <div className="w-full p-2">
                    <Table /> 
                </div> */}
            </div>
        </div>
    )
}
