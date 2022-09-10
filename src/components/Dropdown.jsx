import RNPickerSelect from 'react-native-picker-select';
import Text from "./Text";

const selectedItem = {
    title: 'Selected item title',
    description: 'Secondary long descriptive text ...',
};

export const Dropdown = () => {
    return (
        <RNPickerSelect
            placeholder={{label : "Select an item...", inputLabel : "Lol"}}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Latest repositories', value: 'Latest repositories' },
                { label: 'Highest rated repositories', value: 'Highest rated repositories' },
                { label: 'Lowest rated repositories', value: 'Lowest rated repositories' },
            ]}
        />
    );
};

export default Dropdown