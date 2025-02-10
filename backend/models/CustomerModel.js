const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true,
      },
      icNumber: {
        type: String,
        required: true,
        maxlength: 14,
        match: /^\d+$/,
      },
      dateOfBirth: {
        type: Date,
        required: true,
        validate: {
          validator: function (value) {
            const ageDiff = new Date().getFullYear() - value.getFullYear();
            return ageDiff >= 18;
          },
          message: "User must be at least 18 years old to register.",
        },
      },
      address: {
        type: String,
        required: true,
      },
      addressCountry: {
        type: String,
        required: true,
        enum: ["Malaysia", "Singapore"],
      },
      addressPostcode: {
        type: String,
        required: true,
        maxlength: 20,
        match: /^\d+$/,
      },
}, {timestamps: true})

module.exports = mongoose.model('Customer', customerSchema)
