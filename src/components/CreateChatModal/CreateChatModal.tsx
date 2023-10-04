import ChatController, {
  GetChatPartnersDTO,
} from "../../infra/controllers/ChatController";
import "./style.css";
import React, { useEffect, useState } from "react";

interface CreateChatModalProps {
  show: boolean;
  chatController: ChatController;
  closeCallback: () => void;
  onCreateChat: (partnerId: string) => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({
  show,
  onCreateChat,
  closeCallback,
  chatController,
}) => {
  const [options, setOptions] = useState<GetChatPartnersDTO>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  const getOptions = async () => {
    const chatPartners = await chatController.getChatPartners();

    if (options) setOptions(chatPartners);
  };

  const handleCreation = () => {
    if (!selectedOption) {
      alert(
        "You need to choose the user you want to start a conversation with!"
      );
    } else {
      onCreateChat(selectedOption);
    }
  };

  useEffect(() => {
    getOptions();
  }, []);

  if (!show) return null;

  return (
    <div className="modal">
      <h2>Select a partner to chat</h2>
      <span id="close-modal-button" onClick={closeCallback}>
        &times;
      </span>
      <select
        id="dropdown"
        value={selectedOption || ""}
        onChange={handleDropdownChange}
      >
        <option value="" disabled>
          Choose an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.username}
          </option>
        ))}
      </select>

      <button onClick={handleCreation}>Create Chat</button>
    </div>
  );
};

export default CreateChatModal;
