import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

function Home() {
  const date = new Date();
  const [startDate, setStartDate] = useState(date);
  const navigate = useNavigate();

  const subtractYears = (date, years) => {
    date.setFullYear(date.getFullYear() - years);
    return date;
  };

  const handleChange = (date) => {
    setStartDate(date);
  };

  const handleSelect = () => {
    navigate(`/song/${startDate.getFullYear()}`);
    // navigate(`/albums/${startDate.getFullYear()}`);
    console.log(`START DATE: ${startDate}`);
  };

  return (
    <>
      <section className="hero is-small is-link">
        <div className="hero-body">
          <p className="title">Discover music from a random year</p>
          {/* <p className="subtitle">Discover music from your year of birth</p> */}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <h1 className="title">Pick a Year</h1>
              <div className="is-inline-flex">
                <DatePicker
                  selected={startDate}
                  onChange={handleChange}
                  showYearPicker
                  dateFormat="yyyy"
                  minDate={subtractYears(date, 12)}
                  maxDate={new Date()}
                />
                <button
                  className="button is-fullwidth is-link"
                  onClick={handleSelect}
                >
                  Get My Random Song
                </button>
              </div>
            </div>
            <div className="column is-half">
              <div className="columns">
                <div className="column">
                  <img
                    src="https://atribecalledquest.com/wp-content/uploads/2014/08/mm.jpg"
                    alt="Tribe Called Quest"
                    loading="lazy"
                    width="350"
                    height="350"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/5/59/BaduizmErykah.jpg/220px-BaduizmErykah.jpg"
                    alt="Erykah Badu"
                    loading="lazy"
                    width="350"
                    height="350"
                  />
                </div>
                <div className="column">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg"
                    alt="Daft Punk"
                    loading="lazy"
                    width="350"
                    height="350"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg"
                    alt="Frank Ocean"
                    loading="lazy"
                    width="350"
                    height="350"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
