import mongoose from "mongoose";
import { IUser } from "../types/user";
import User from "../model/user";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

mongoose.connect(mongoUri);

const users: Pick<IUser, "name" | "email" | "password">[] = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "$2b$10$FIVbRfj58Dlx8ldZSdjNJ.6FEgxcZmDAcXvXN4kmb1c3.lExVm.W.",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    password: "$2b$10$cMdXzXQrG5fosMhtPsHQre2zZ9BodBpWm8/XOanMb6yxMSM7/cxmK",
  },
  {
    name: "Emily Johnson",
    email: "emilyj@example.com",
    password: "$2b$10$0xhk/xVGol5k.GEomXiYpuH69WZy/j.YiLlbFsE/OfN5GYM.JJSdO",
  },
  {
    name: "Michael Brown",
    email: "michaelb@example.com",
    password: "$2b$10$dSB4.v/LbpKEvPW4tv4WKO14NERURPqM.o7Rvs4rF5T6sABTztxz6",
  },
  {
    name: "Sarah Davis",
    email: "sarahd@example.com",
    password: "$2b$10$r9HGFVDFtU5QDV0m/bWbhecbVqLoAIdnK6QsjNHxuEP54Hmfp7.Oa",
  },
  {
    name: "Chris Wilson",
    email: "chrisw@example.com",
    password: "$2b$10$yXdpUlYTkeyfip0s5PnOfONYb1hAWaaLOuuN1JaMrWamVp.6I2iBe",
  },
  {
    name: "Jessica Lee",
    email: "jessical@example.com",
    password: "$2b$10$Evjx8yQ.3KQmTiEpTCisBeTG04BwNViphsjN1NXkvBcPyQRh/YDBe",
  },
  {
    name: "David Harris",
    email: "davidh@example.com",
    password: "$2b$10$8HipF8lfmRxDq5DJa.t0xemj4f/4cGHuUBTIEgeoVrAjKg6DrPdCa",
  },
  {
    name: "Laura Martin",
    email: "lauram@example.com",
    password: "$2b$10$Gr2SlkOuRYjDK6dokMY.jeUXRdfwy5XXS8qkklkkvu46yXyDqSVBG",
  },
  {
    name: "James Taylor",
    email: "jamest@example.com",
    password: "$2b$10$twX36NCHd1qveI6Z/YmyEuEO0DZNb/UUgXK72QI3EwUVHYMWgfdie",
  },
  {
    name: "Anna Anderson",
    email: "annaanderson@example.com",
    password: "$2b$10$/EvdyYy28pZgF6q1JtjIy.I7vUakYJgj2Zj8/10pdxL5Ad7fXB/6u",
  },
  {
    name: "Matthew Thomas",
    email: "matthewt@example.com",
    password: "$2b$10$uz30Pjh7i5EK/YOqpQ1/vOKHeae4uRfFkBkWGWwZ9mg8/1FdEcfH.",
  },
  {
    name: "Megan Moore",
    email: "meganm@example.com",
    password: "$2b$10$5DjeBgC7I0lY7XZ.j.q4dexI6xn6J1cqkG9OWjwfloqfaFO2xel/W",
  },
  {
    name: "Daniel Garcia",
    email: "danielg@example.com",
    password: "$2b$10$s6X8zd/llKx0oKHQROgjxuSJG1Hhdaw4R0OoSh8u174SVpgMiz7AK",
  },
  {
    name: "Sophia Martinez",
    email: "sophiam@example.com",
    password: "$2b$10$OenIt8e.9TTUcnjPxTRMvO6T0V3p/r451oYJsQEcdMAKMvcHRy0ZG",
  },
  {
    name: "William White",
    email: "williamw@example.com",
    password: "$2b$10$nHBspz9r/iXY7FX19Z7.OuUpcd7rbKNIiUIcTYIxMf/YOqg9dmBiG",
  },
  {
    name: "Olivia Clark",
    email: "oliviac@example.com",
    password: "$2b$10$LUHEZpgDPzdoTfSUkTRqlubCSWaV4Q/ylcBKFvyiZWSW5dlwPtIVi",
  },
  {
    name: "Alexander Rodriguez",
    email: "alexander@example.com",
    password: "$2b$10$uC1Kkol6Nk/VVfeQo9fpJuced3RzyA7OO0NfNwOj2BMeUmbPwGuay",
  },
  {
    name: "Lucas Walker",
    email: "lucasw@example.com",
    password: "$2b$10$8td1TJOwvmaj3yJROiTEVODxaNYRBG7ia5.Ant1S4.ZJXHKlACM8G",
  },
];

async function seedUsers() {
  try {
    const seedUsers = await User.insertMany(users);
    console.log(seedUsers);
  } catch (error) {
    throw error;
  }
}

seedUsers();
// To initialize database with a few users to start with
