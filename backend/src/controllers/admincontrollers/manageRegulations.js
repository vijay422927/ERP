import { Regulation } from "../../models/Regulation";

export const addRegulationController = async (req, res) => {
  try {
    const { name, status } = req.body;
    const newRegulation = await Regulation.create({
      name: name,
      status: status,
    });
    if (!newRegulation) {
      return res.status(400).josn({
        success: false,
        message: "failed add new regulation",
      });
    }
    res.status(200).json({
      success: true,
      message: "new regulation is added succesfully",
      newRegulation,
    });
  } catch (error) {
    console.log("error while adding new regulation :", error);
    res.status(500).json({
      success: false,
      message: "error while adding new regulation",
      error: error,
    });
  }
};

export const toggleRegulationStatusController = async (req, res) => {
  try {
    const { regulationId } = req.params.regulationId;
    if (!regulationId) {
      return res.status(404).json({
        success: false,
        message: "regulation id is not found",
      });
    }

    const regulation = await Regulation.findById({ _id: regulationId });
    if (!regulation) {
      return res.status(404).json({
        success: false,
        message: "regulation is not found",
      });
    }

    regulation.status = regulation.status === "active" ? "inactive" : "active";
    await regulation.save();

    res.status(200).json({
      success: true,
      message: "regulation status is toggles successfully",
      regulation,
    });
  } catch (error) {
    console.log("error while toggling the status of the regulation :", error);
    res.status(500).json({
      success: false,
      message: "error while toggling the regulation status",
      error: error,
    });
  }
};

export const getAllRegulationController = async (req, res) => {
  try {
    const allRegulations = await Regulation.find();
    if (!allRegulations) {
      return res.status(404).json({
        success: false,
        message: "failed to fetch the regulation",
      });
    }
    res.status(200).json({
      success: true,
      message: "regultions are fetched successfully",
      allRegulations,
    });
  } catch (error) {
    console.log("failed to fetch the regulations :", error);
    res.status(500).json({
      success: false,
      message: "failed to fetch the regulation",
      error: error,
    });
  }
};
