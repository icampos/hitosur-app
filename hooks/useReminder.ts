import { CreateReminderMutation } from "mutations/reminder";
import { useMutation } from "@apollo/client";

const CreateReminder = () => {
    const [
        createReminder,
        { loading, error },
      ] = useMutation(CreateReminderMutation, {
        onCompleted: () => {
            refetch();
            setIsAddDrawerVisible(false)
        },
      });
}

