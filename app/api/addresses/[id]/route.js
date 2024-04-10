import  {NextResponse} from "next/server";


// Ruta para obtener todas las direcciones de un usuario
router.get('/users/:userId/addresses', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const addresses = await prisma.address.findMany({
        where: {
          userId,
        },
      });
  
      res.json(addresses);
    } catch (error) {
      console.error('Error retrieving addresses:', error);
      res.status(500).json({ error: 'Error retrieving addresses' });
    }
  });
















export function GET() {
    return NextResponse.json({
        message: "getting single note..."
    })
}

export function DELETE() {
    return NextResponse.json({
        message: "deleting single note..."
    })
}

export function PUT() {
    return NextResponse.json({
        message: "updating single note..."
    })
}