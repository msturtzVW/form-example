import "./App.css";
import {
  Button,
  FormControl,
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
};

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string().min(1, "Last Name is required"),
  emailAddress: z.string().email().min(4, "Email is required"),
});

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    values: {
      firstName,
      lastName,
      emailAddress,
    },
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormData> = (values: FormData) => {
    clearErrors();
    if (emailAddress.length < 4) {
      setError("emailAddress", {
        message: "Email Address is not long enough.",
      });
    } else {
      window.alert(
        `Success!
        First Name: ${values.firstName}
        Last Name: ${values.lastName}
        email: ${values.emailAddress}`,
      );
      handleSubmit((data) => console.log(data));
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 600 }}>
      <Typography variant="h3">Simple Form</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                sx={{ margin: 2 }}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                required
                sx={{ margin: 2 }}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
                error={!!errors.lastName}
              />
              {!!errors.lastName && (
                <FormHelperText error>
                  {errors.lastName?.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="emailAddress"
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                {...field}
                label="Email Address"
                variant="outlined"
                required
                sx={{ margin: 2 }}
                error={!!errors.emailAddress}
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                }}
                value={emailAddress}
              />
              {!!errors.emailAddress && (
                <FormHelperText error>
                  {errors.emailAddress?.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Paper>
  );
}

export default App;
