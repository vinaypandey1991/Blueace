const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    memberAdharImage: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }
})

const rangeSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    }
})

const VendorSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    yearOfRegistration: {
        type: String,
        required: true
    },
    registerAddress: {
        type: String,
        required: true
    },
    registerEmail: {
        type: String,
        required: [true, "Please provide an Email"],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerNumber: {
        type: String,
        unique: true,
        required: [true, "Please provide a Contact Number"]
    },
    panNo: {
        type: String,
        required: true
    },
    gstNo: {
        type: String,
        required: true
    },
    adharNo: {
        type: String,
        required: true
    },
    panImage: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    adharImage: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    gstImage: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    member: [memberSchema],
    Password: {
        type: String,
        required: [true, "Please provide a Password"]
    },
    PasswordChangeOtp: {
        type: String
    },
    OtpExpiredTime: {
        type: Date
    },
    NewPassword: {
        type: String
    },
    Role: {
        type: String,
        default: 'vendor'
    },
    RangeWhereYouWantService: [
        rangeSchema
    ],
    vendorImage: {
        url: {
            type: String,
            // required: true
        },
        public_id: {
            type: String,
            // required: true
        }
    },
    isDeactive: {
        type: Boolean,
        default: false
    },
    memberShipPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MembershipPlan'
    },
    razorpayOrderId: {
        type: String
    },
    memberShipPrice: {
        type: Number
    }
}, { timestamps: true })

VendorSchema.pre('save', async function (next) {
    const vendor = this;
    if (!vendor.isModified('Password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(vendor.Password, 10);
        vendor.Password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

VendorSchema.index({ 'RangeWhereYouWantService.location': '2dsphere' });

VendorSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.Password);
};


const Vendor = mongoose.model('Vendor', VendorSchema)
module.exports = Vendor