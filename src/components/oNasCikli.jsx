import { useParams } from "react-router-dom";
import { cikliPodatki } from "./oNasCikliPodatki";

const ONasCikli = () => {
    const { slug } = useParams();
    const cikel = cikliPodatki.find((c) => c.slug === slug);

    if (!cikel) {
        return <div style={{ padding: "2rem" }}>Cikel ni bil najden.</div>;
    }

    return (
        <div className="cikel-stran" style={{ padding: "2rem" }}>
            <img src={cikel.logo} alt={cikel.ime} style={{ maxWidth: "200px" }} />
            <h1>{cikel.ime}</h1>
            <h2>{cikel.podnaslov}</h2>
            <p>{cikel.vsebina}</p>
        </div>
    );
};

export default ONasCikli;
