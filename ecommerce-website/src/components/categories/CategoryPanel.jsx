import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import { categories } from "./Categories"; // ✅ FIXED

const CategoryPanel = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <div className="w-[250px] p-4">

        <h2 className="font-bold mb-4">Categories</h2>

        <div className="flex flex-col gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                navigate(cat.path);
                setOpen(false);
              }}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-8 h-8 object-contain"
              />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>

      </div>
    </Drawer>
  );
};

export default CategoryPanel;