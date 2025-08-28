import { Schema, model } from "mongoose";
import { IUser } from "../types/user";
import { IToken } from "../types/token";

const tokenSchema = new Schema<IToken>({
  token: {
    type: String,
    required: true,
    // validate: {
    //   validator: (v: string) => v,
    //   message: (props) =>
    //     `"${props.value}" is not a valid name. Name can only contain letters (including non-English characters), spaces, apostrophes, and hyphens. Examples: "firstname lastname", "firstName middleName lastName", or "Anne-Marie O'Connor".`,
    // },
  },
});

export default model<IToken>("token", tokenSchema);
