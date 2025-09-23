const Contact = require("../models/contact");


exports.createContact = async(req,res)=>{
    const{name, email, phone, type, notes} = req.body
    try{
       const newContact = new Contact({
            user: req.user.id,
            name,
            email,
            phone,
            type,
            notes

       })
        const savedContact = await newContact.save()
        res.status(201).json({ msg: "New Contact saved successfully", contact: savedContact });

    }
    catch(err){
        res.status(500).json({ message: "Server Error", err })
    }
}

exports.getContact = async(req,res)=>{
    try{
        const contacts = await Contact.find({user:req.user.id}).sort({createdAt:-1})
        res.status(200).json(contacts);
    }
    catch(err){
        res.status(500).json({ message: "Server Error", err })
    }
}

exports.updateContact = async(req,res)=>{
    const{name, email, phone, type, notes} = req.body
    try{
        let contact = await Contact.findById(req.params.id)
        if(!contact)
            return res.status(404).json({ message: "Contact not found" });
        if (contact.user.toString() !== req.user.id) 
            return res.status(401).json({ message: "Not authorized" });

        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            {name, email, phone, type, notes},
            {new:true}
        )
        res.status(200).json({msg:"Contact Updated Successfully",contact})
    }
    
    
    catch(err){
         res.status(500).json({ message: "Server Error", err })
    }
}

exports.deleteContact = async(req,res)=>{
    try{
        const contact = await Contact.findById(req.params.id);
        if (!contact) 
            return res.status(404).json({ message: "Contact not found" });
        if (contact.user.toString() !== req.user.id) 
            return res.status(401).json({ message: "Not authorized" });

        await Contact.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Contact deleted successfully" });
    }

    catch(err){
         res.status(500).json({ message: "Server Error", err })
    }

}