import { db } from '../db';
import { hash } from 'bcrypt';

async function createAdminUser() {
    console.log("Creando admin")
  const hashedPassword = await hash("admin123", 10);

  const adminUser = await db.user.create({
    data: {
        name: "Admin2",
        password: hashedPassword,
        email: "admin2@example.com",
        phone: 1234567890,
        address: "Calle Admin 123",
        is_admin: true
    }
  });

  console.log("Usuario admin creado:", adminUser);
  process.exit(0);
}

createAdminUser().catch((err) => {
    console.error("Error creando admin:", err);
    process.exit(1);
  });
