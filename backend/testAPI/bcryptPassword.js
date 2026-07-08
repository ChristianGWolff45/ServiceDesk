bcrypt = require("bcrypt");
async function password() {
  const hash_password = await bcrypt.hash("Password123!", 10);
  console.log(hash_password);
}
password();
