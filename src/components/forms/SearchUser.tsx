import {  Autocomplete,  AutocompleteSection,  AutocompleteItem} from "@nextui-org/react";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export const SearchUser = () => (



    <div>
         <Autocomplete
      className="max-w-xs"
      
      items={}
      label="Select a character"
      placeholder="Type to search..."
      variant="bordered"
      //onInputChange={list.setFilterText}
      onInputChange={(e)=>{
            console.log(e)
      }}
    >
      {(item) => (
        <AutocompleteItem key={item.name} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>

    </div>
)