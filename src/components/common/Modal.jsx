import { useState } from "react";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>View Alphabet</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Chakma Alphabet"
      >
        <p className="text-gray-700">এখানে অক্ষরের বিস্তারিত তথ্য দেখাবেন।</p>
      </Modal>
    </>
  );
}
