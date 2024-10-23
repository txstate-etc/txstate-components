import { Form, Button, Stack } from "../components";
import { TextInput } from "../components/Form/Inputs";

export default {
  title: "Form|Using",
  components: Form,
};

export const BasicForm = {
  render: () => (
    //Call to form's submit function
    <Form>
      <Stack spacing={12}>
        <TextInput path="name.first" label="First Name" />
        <TextInput path="name.last" label="Last Name" />
        <Button label="Submit" ariaLabel="submit name" onClick={() => {}} />
      </Stack>
    </Form>
  ),

  name: "Basic Form",
};
