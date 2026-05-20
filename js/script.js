function calculateAge() {

  const dobInput = document.getElementById("dob").value;
  const result = document.getElementById("result");

  if (!dobInput) {
    result.innerHTML = "<p>Please select your date of birth.</p>";
    return;
  }

  const birthDate = new Date(dobInput);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const previousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();

    days += previousMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor(
    (today - birthDate) / (1000 * 60 * 60 * 24)
  );

  const totalMonths = years * 12 + months;

  const zodiac = getZodiacSign(
    birthDate.getDate(),
    birthDate.getMonth() + 1
  );

  const nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (today > nextBirthday) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const birthdayCountdown = Math.ceil(
    (nextBirthday - today) / (1000 * 60 * 60 * 24)
  );

  const leapYear = isLeapYear(birthDate.getFullYear())
    ? "Yes"
    : "No";

  result.innerHTML = `
    <div class="result-card">

      <h2>Your Results</h2>

      <p><strong>Exact Age:</strong> ${years} years, ${months} months, ${days} days</p>

      <p><strong>Total Months:</strong> ${totalMonths}</p>

      <p><strong>Total Days:</strong> ${totalDays}</p>

      <p><strong>Zodiac Sign:</strong> ${zodiac}</p>

      <p><strong>Next Birthday In:</strong> ${birthdayCountdown} days</p>

      <p><strong>Born In Leap Year:</strong> ${leapYear}</p>

    </div>
  `;
}

function isLeapYear(year) {
  return (
    (year % 4 === 0 && year % 100 !== 0) ||
    year % 400 === 0
  );
}

function getZodiacSign(day, month) {

  const zodiacSigns = [

    ["Capricorn", 19],
    ["Aquarius", 18],
    ["Pisces", 20],
    ["Aries", 19],
    ["Taurus", 20],
    ["Gemini", 20],
    ["Cancer", 22],
    ["Leo", 22],
    ["Virgo", 22],
    ["Libra", 22],
    ["Scorpio", 21],
    ["Sagittarius", 21],
    ["Capricorn", 31]

  ];

  return day <= zodiacSigns[month - 1][1]
    ? zodiacSigns[month - 1][0]
    : zodiacSigns[month][0];
}