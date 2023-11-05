import information from "../../assets/information.png";
import footer from "../../assets/footer.png";

export default function Footer() {
  return (
    <div style={{ margin: 0, backgroundColor: "#d29b42" }}>
      <div>
        <img src={information} style={{ width: "100%" }} />
      </div>
      <div>
        <img src={footer} style={{ width: "100%" }} />
      </div>
    </div>
  );
}
