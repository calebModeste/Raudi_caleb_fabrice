import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const [payments, setPayments] = React.useState(null);
  const [error, setError] = React.useState("");
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  React.useEffect(() => {
    const checkUser = async () => {
      const tokken = localStorage.getItem("tokken");

      if (!tokken) {
        navigate("/sign-in");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/raudiApi/profile", {
          headers: {
            Authorization: `Bearer ${tokken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }

        const data = await response.json();

        if (data.role !== 2) {
          navigate("/dashboard");
          return;
        }

        setUser(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user:", err.message);
        navigate("/sign-in");
      }
    };

    checkUser();
  }, [navigate]);

  React.useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await fetch(`http://localhost:5000/raudiApi/entities`);

        if (!response.ok) {
          throw new Error("Failed to fetch payments information");
        }

        const data = await response.json();
        const sortedPayments = data.sort(
          (a, b) => new Date(b.datePayment) - new Date(a.datePayment)
        );
        setPayments(sortedPayments);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching payments:", err.message);
      }
    };

    fetchPayment();
  }, []);

  const calculateMonthlyGain = () => {
    const monthlyGains = {};

    payments.forEach((payment) => {
      const date = new Date(payment.datePayment);
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${month}-${year}`;

      if (!monthlyGains[key]) {
        monthlyGains[key] = 0;
      }
      monthlyGains[key] += payment.prixTotal;
    });

    return monthlyGains;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!payments) {
    return <div>Loading...</div>;
  }

  const monthlyGains = calculateMonthlyGain();

  return (
    <div className="min-h-screen flex flex-col items-center py-20 bg-gray-100">
      <div className="bg-white w-4/5 md:w-3/5 shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center z20 text-gray-700">
          Historique des Paiements
        </h2>
        {payments.map((payment) => (
          <div
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
            key={payment.id}
          >
            <div className="text-gray-600">
              <p className="text-sm">
                Code de la facture:{" "}
                <span className="font-semibold">{payment.serieCode}</span>
              </p>
              <p className="text-sm">
                De: <span className="font-semibold">{payment.name}</span>
              </p>
              <p className="text-sm">
                Date d'achat:{" "}
                <span className="font-semibold">
                  {new Date(payment.datePayment).toLocaleDateString("fr-FR")}
                </span>
              </p>
            </div>
            <div className="text-green-600 font-bold text-lg">
              + {payment.prixTotal} €
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row w-4/5 md:w-3/5 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Gains mensuels
          </h3>
          <ul className="text-gray-600">
            {Object.keys(monthlyGains).map((monthYear) => {
              const [month, year] = monthYear.split("-");
              return (
                <li key={monthYear} className="mb-2">
                  <span className="font-semibold">
                    {monthNames[month]} {year}
                  </span>
                  : {monthlyGains[monthYear]} €
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Prix total de tous les paiements
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {payments.reduce((acc, payment) => acc + payment.prixTotal, 0)} €
          </p>
        </div>
      </div>
    </div>
  );
}
