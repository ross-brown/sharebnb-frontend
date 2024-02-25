import Button from "../common/Button";
import { useState } from "react";
import DeleteAccountModal from "../common/DeleteAccountModal";

function DangerZone() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="border-2 border-rose-300 max-w-xl mx-auto p-6 bg-rose-200 rounded-lg">
      <p className="font-semibold text-rose-800 text-lg">DANGER ZONE</p>
      <p className="text-sm text-slate-800">
        These actions are not reversible. All data will be deleted permanently.
      </p>
      <Button color="rose" onClick={() => setOpenModal(true)} >
        Delete Account
      </Button>
      <DeleteAccountModal toggleModal={setOpenModal} open={openModal} />
    </div>
  );
}


export default DangerZone;
